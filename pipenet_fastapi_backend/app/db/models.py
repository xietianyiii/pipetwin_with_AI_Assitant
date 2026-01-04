from sqlalchemy import Column, String, Float, Integer
from app.db.database import Base

class PipeNetKunshan(Base):
    __tablename__ = "pipenet_kunshan"

    wyid = Column(String, primary_key=True, index=True)  # ✔ 主键修改为 wyid
    fid = Column(Integer, index=True)  # ✔ 普通序号字段
    qdb = Column(String)
    zdb = Column(String)
    fclass = Column(String)
    length = Column(Float)
    cz = Column(String)
    gj = Column(Float)
    qdg = Column(Float)
    zdg = Column(Float)
    flow = Column(Float)
    start_lon = Column(Float)
    start_lat = Column(Float)
    end_lon = Column(Float)
    end_lat = Column(Float)



class PipeNetNanjing(Base):
    __tablename__ = "pipenet_nanjing"   # ⭐ 对应数据库里真实的表名

    wyid = Column(String, primary_key=True, index=True)
    fid = Column(Integer, index=True)
    qdb = Column(String)
    zdb = Column(String)
    fclass = Column(String)
    length = Column(Float)
    cz = Column(String)
    gj = Column(Float)
    qdg = Column(Float)
    zdg = Column(Float)
    flow = Column(Float)
    start_lon = Column(Float)
    start_lat = Column(Float)
    end_lon = Column(Float)
    end_lat = Column(Float)