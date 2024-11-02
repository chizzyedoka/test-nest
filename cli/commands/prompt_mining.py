from utils.analytics_logger import AnalyticsLogger
import time

class PromptMining:
    def __init__(self):
        self.analytics = AnalyticsLogger()

    def execute_prompt(self, user_id: str, lab_id: str, prompt_text: str):
        start_time = time.time()

        try:
            # Your existing prompt mining logic here
            result = self.your_mining_function(prompt_text)

            # Log analytics
            execution_time = int((time.time() - start_time) * 1000)  # Convert to milliseconds

            self.analytics.log_prompt(
                user_id=user_id,
                lab_id=lab_id,
                prompt_data={
                    'prompt_text': prompt_text,
                    'tokens_used': result.get('total_tokens', 0),
                    'completion_tokens': result.get('completion_tokens', 0),
                    'prompt_tokens': result.get('prompt_tokens', 0),
                    'model_used': result.get('model', 'unknown'),
                    'response_time_ms': execution_time,
                    'success': True,
                    'metadata': {
                        'mining_type': 'cli',
                        'additional_data': result.get('extra_info', {})
                    }
                }
            )

            # Update lab usage statistics
            self.analytics.update_lab_usage(
                lab_id=lab_id,
                usage_data={
                    'total_prompts': 1,
                    'total_tokens_used': result.get('total_tokens', 0),
                    'average_response_time_ms': execution_time,
                    'success_rate': 100
                }
            )

            return result

        except Exception as e:
            # Log failed attempt
            execution_time = int((time.time() - start_time) * 1000)

            self.analytics.log_prompt(
                user_id=user_id,
                lab_id=lab_id,
                prompt_data={
                    'prompt_text': prompt_text,
                    'success': False,
                    'error_message': str(e),
                    'response_time_ms': execution_time,
                    'metadata': {
                        'mining_type': 'cli',
                        'error_type': type(e).__name__
                    }
                }
            )
            raise