from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import text

from app.db.database import get_db
from app.db.models import PipeNetKunshan, PipeNetNanjing

router = APIRouter(
    prefix="/pipes",
    tags=["Pipes"]
)

TABLE_MODEL_MAP = {
    "pipenet_kunshan": PipeNetKunshan,
    "pipenet_nanjing": PipeNetNanjing,
}

ALLOWED_GEO_TABLES = set(TABLE_MODEL_MAP.keys())

# ---------- 1. 获取管网属性 ----------

@router.get("/{table_name}/{wyid}")
async def get_pipe_any(
    table_name: str,
    wyid: str,
    db: AsyncSession = Depends(get_db)
):
    Model = TABLE_MODEL_MAP.get(table_name)
    if Model is None:
        raise HTTPException(status_code=400, detail="非法的表名")

    result = await db.execute(
        select(Model).where(Model.wyid == wyid)
    )
    pipe = result.scalar_one_or_none()

    if pipe is None:
        raise HTTPException(status_code=404, detail="wyid not found")

    return {
        "wyid": pipe.wyid,
        "qdb": pipe.qdb,
        "zdb": pipe.zdb,
        "fclass": pipe.fclass,
        "length": pipe.length,
        "cz": pipe.cz,
        "gj": pipe.gj,
        "qdg": pipe.qdg,
        "zdg": pipe.zdg,
        "flow": pipe.flow,
        "start_lon": pipe.start_lon,
        "start_lat": pipe.start_lat,
        "end_lon": pipe.end_lon,
        "end_lat": pipe.end_lat,
    }

# ---------- 2. 获取管网 GeoJSON ----------

@router.get("/{table_name}/{wyid}/geojson")
async def get_pipe_geojson_any(
    table_name: str,
    wyid: str,
    db: AsyncSession = Depends(get_db)
):
    if table_name not in ALLOWED_GEO_TABLES:
        raise HTTPException(status_code=400, detail="非法的表名")

    sql = text(f"""
        SELECT 
            wyid,
            qdb, zdb, fclass, length, cz, gj, qdg, zdg, flow,
            start_lon, start_lat, end_lon, end_lat,
            ST_AsGeoJSON(geom) AS geojson
        FROM {table_name}
        WHERE wyid = :wyid;
    """)

    result = await db.execute(sql, {"wyid": wyid})
    row = result.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="wyid not found")

    return {
        "type": "Feature",
        "geometry": None if row.geojson is None else eval(row.geojson),
        "properties": {
            "wyid": row.wyid,
            "qdb": row.qdb,
            "zdb": row.zdb,
            "fclass": row.fclass,
            "length": row.length,
            "cz": row.cz,
            "gj": row.gj,
            "qdg": row.qdg,
            "zdg": row.zdg,
            "flow": row.flow,
            "start_lon": row.start_lon,
            "start_lat": row.start_lat,
            "end_lon": row.end_lon,
            "end_lat": row.end_lat,
        }
    }
