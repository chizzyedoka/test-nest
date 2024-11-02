from datetime import datetime
import json
from .db_connection import DatabaseConnection

class AnalyticsLogger:
    def __init__(self):
        self.db = DatabaseConnection()

    def log_prompt(self, user_id: str, lab_id: str, prompt_data: dict):
        """
        Log prompt analytics to the database
        """
        try:
            conn = self.db.connect()
            cur = conn.cursor()

            query = """
            INSERT INTO prompt_analytics (
                user_id, lab_id, prompt_text, tokens_used,
                completion_tokens, prompt_tokens, model_used,
                response_time_ms, success, error_message, metadata
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
            """

            cur.execute(query, (
                user_id,
                lab_id,
                prompt_data.get('prompt_text'),
                prompt_data.get('tokens_used'),
                prompt_data.get('completion_tokens'),
                prompt_data.get('prompt_tokens'),
                prompt_data.get('model_used'),
                prompt_data.get('response_time_ms'),
                prompt_data.get('success', True),
                prompt_data.get('error_message'),
                json.dumps(prompt_data.get('metadata', {}))
            ))

            conn.commit()
            cur.close()

        except Exception as e:
            print(f"Error logging prompt analytics: {e}")
            if conn:
                conn.rollback()
        finally:
            self.db.close()

    def update_lab_usage(self, lab_id: str, usage_data: dict):
        """
        Update lab usage analytics
        """
        try:
            conn = self.db.connect()
            cur = conn.cursor()

            query = """
            INSERT INTO lab_usage_analytics (
                lab_id, date, total_users, total_prompts,
                total_tokens_used, average_response_time_ms, success_rate
            ) VALUES (
                %s, CURRENT_DATE, %s, %s, %s, %s, %s
            )
            ON CONFLICT (lab_id, date) DO UPDATE SET
                total_prompts = lab_usage_analytics.total_prompts + EXCLUDED.total_prompts,
                total_tokens_used = lab_usage_analytics.total_tokens_used + EXCLUDED.total_tokens_used,
                total_users = GREATEST(lab_usage_analytics.total_users, EXCLUDED.total_users),
                average_response_time_ms = (
                    lab_usage_analytics.average_response_time_ms + EXCLUDED.average_response_time_ms
                ) / 2,
                success_rate = (
                    lab_usage_analytics.success_rate + EXCLUDED.success_rate
                ) / 2
            """

            cur.execute(query, (
                lab_id,
                usage_data.get('total_users', 1),
                usage_data.get('total_prompts', 1),
                usage_data.get('total_tokens_used', 0),
                usage_data.get('average_response_time_ms', 0),
                usage_data.get('success_rate', 100)
            ))

            conn.commit()
            cur.close()

        except Exception as e:
            print(f"Error updating lab usage analytics: {e}")
            if conn:
                conn.rollback()
        finally:
            self.db.close()