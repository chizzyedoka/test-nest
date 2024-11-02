import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseConnection:
    def __init__(self):
        self.conn_params = {
            'dbname': os.getenv('POSTGRES_DB'),
            'user': os.getenv('POSTGRES_USER'),
            'password': os.getenv('POSTGRES_PASSWORD'),
            'host': os.getenv('POSTGRES_HOST', 'localhost'),
            'port': os.getenv('POSTGRES_PORT', '5432'),
            'sslmode': 'require'  # Add SSL mode for cloud databases
        }
        self.conn = None

    def connect(self):
        try:
            self.conn = psycopg2.connect(**self.conn_params)
            return self.conn
        except Exception as e:
            print(f"Error connecting to database: {e}")
            raise

    def close(self):
        if self.conn:
            self.conn.close()