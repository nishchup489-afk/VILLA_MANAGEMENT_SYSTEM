import os

from logging.config import fileConfig

from dotenv import load_dotenv

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# =========================================================
# IMPORT BASE METADATA
# =========================================================

from app.core.database import Base

# =========================================================
# IMPORTANT:
# IMPORT ALL MODEL MODULES
#
# WHY?
#
# Alembic ONLY detects models that were imported.
#
# Without imports:
#
# Base.metadata.tables == {}
#
# meaning:
# no tables detected
# empty migrations generated
#
# This is one of the most common Alembic issues.
# =========================================================

from app.models import orders
from app.models import inventory
from app.models import menu
from app.models import waste

# =========================================================
# ALEMBIC CONFIG
# =========================================================

config = context.config

# =========================================================
# CONVERT ASYNC URL -> SYNC URL
#
# WHY?
#
# Alembic migrations run synchronously.
#
# Your app runtime uses:
# asyncpg
#
# Alembic uses:
# psycopg
#
# Example:
#
# postgresql+asyncpg://
# ->
# postgresql+psycopg://
# =========================================================

config.set_main_option(
    "sqlalchemy.url",
    DATABASE_URL.replace(
        "asyncpg",
        "psycopg"
    )
)

# =========================================================
# LOGGING CONFIG
# =========================================================

if config.config_file_name is not None:

    fileConfig(
        config.config_file_name
    )

# =========================================================
# TARGET METADATA
#
# Alembic compares:
#
# Base.metadata
#
# against actual PostgreSQL schema.
# =========================================================

target_metadata = Base.metadata


# =========================================================
# OFFLINE MIGRATIONS
# =========================================================

def run_migrations_offline() -> None:

    """
    Run migrations without DB connection.

    Generates SQL scripts only.
    """

    url = config.get_main_option(
        "sqlalchemy.url"
    )

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named"
        },
    )

    with context.begin_transaction():

        context.run_migrations()


# =========================================================
# ONLINE MIGRATIONS
# =========================================================

def run_migrations_online() -> None:

    """
    Run migrations directly against DB.
    """

    connectable = engine_from_config(

        config.get_section(
            config.config_ini_section,
            {}
        ),

        prefix="sqlalchemy.",

        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():

            context.run_migrations()


# =========================================================
# EXECUTION MODE
# =========================================================

if context.is_offline_mode():

    run_migrations_offline()

else:

    run_migrations_online()