from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

from app.config.settings import DATABASE_URL

# Algunos proveedores entregan "postgres://", que SQLAlchemy no acepta
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    # Evita que los errores de SQL muestren datos de usuarios en los logs
    hide_parameters=True
)

try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        print("Conexión exitosa a la base de datos")
except Exception as e:
    print("Error de conexión:", e)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# Dependencia para FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()