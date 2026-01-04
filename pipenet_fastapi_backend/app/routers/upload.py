from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import geopandas as gpd
import logging

router = APIRouter(
    prefix="",
    tags=["Upload"]
)

UPLOAD_DIRECTORY = Path("./uploads")
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

# ---------- 1. 上传文件 ----------

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = UPLOAD_DIRECTORY / file.filename
        name_without_ext = file.filename.rsplit(".", 1)[0]

        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)

        return {
            "filename": name_without_ext,
            "url": f"/uploads/{file.filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- 2. 查询 shp 字段 ----------

@router.get("/query_Fieldname/{filename}")
async def query_fieldname(filename: str):
    try:
        shp_path = UPLOAD_DIRECTORY / f"{filename}.shp"

        if not shp_path.exists():
            raise HTTPException(status_code=404, detail="文件未找到")

        gdf = gpd.read_file(shp_path)
        return {"fieldnames": list(gdf.columns)}

    except Exception as e:
        logging.error(f"查询字段失败: {e}")
        raise HTTPException(status_code=500, detail=str(e))
