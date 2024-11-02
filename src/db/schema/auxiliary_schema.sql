-- Prompt Analytics Table
CREATE TABLE prompt_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lab_id UUID NOT NULL,
    prompt_text TEXT NOT NULL,
    tokens_used INTEGER NOT NULL,
    completion_tokens INTEGER NOT NULL,
    prompt_tokens INTEGER NOT NULL,
    model_used VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    response_time_ms INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    metadata JSONB
);

-- User Session Analytics
CREATE TABLE user_session_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    session_start TIMESTAMP WITH TIME ZONE NOT NULL,
    session_end TIMESTAMP WITH TIME ZONE,
    total_prompts INTEGER DEFAULT 0,
    total_tokens_used INTEGER DEFAULT 0,
    lab_interactions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lab Usage Analytics
CREATE TABLE lab_usage_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL,
    date DATE NOT NULL,
    total_users INTEGER DEFAULT 0,
    total_prompts INTEGER DEFAULT 0,
    total_tokens_used INTEGER DEFAULT 0,
    average_response_time_ms INTEGER,
    success_rate DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lab_id, date)
);

-- Lab Performance Metrics
CREATE TABLE lab_performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    gpu_required BOOLEAN DEFAULT false,
    time_estimate VARCHAR(50) NOT NULL,
    points_reward INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    active_participants INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Progress Metrics
CREATE TABLE user_progress_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lab_id UUID NOT NULL,
    points INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    successful_breaks INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    last_attempt TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jailbreak Attempts
CREATE TABLE jailbreak_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lab_id UUID NOT NULL,
    prompt_text TEXT NOT NULL,
    response TEXT NOT NULL,
    is_successful BOOLEAN DEFAULT false,
    technique_used VARCHAR(100),
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Global Lab Stats
CREATE TABLE global_lab_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_participants INTEGER DEFAULT 0,
    active_gpus INTEGER DEFAULT 0,
    total_points_mined INTEGER DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

-- Create indexes for better query performance
CREATE INDEX idx_prompt_analytics_user_id ON prompt_analytics(user_id);
CREATE INDEX idx_prompt_analytics_lab_id ON prompt_analytics(lab_id);
CREATE INDEX idx_prompt_analytics_created_at ON prompt_analytics(created_at);
CREATE INDEX idx_lab_usage_analytics_date ON lab_usage_analytics(date);
CREATE INDEX idx_lab_performance_metrics_lab_id ON lab_performance_metrics(lab_id);
CREATE INDEX idx_lab_performance_metrics_category ON lab_performance_metrics(category);
CREATE INDEX idx_user_progress_metrics_user_id ON user_progress_metrics(user_id);
CREATE INDEX idx_user_progress_metrics_lab_id ON user_progress_metrics(lab_id);
CREATE INDEX idx_jailbreak_attempts_user_id ON jailbreak_attempts(user_id);
CREATE INDEX idx_jailbreak_attempts_lab_id ON jailbreak_attempts(lab_id);
CREATE INDEX idx_jailbreak_attempts_is_successful ON jailbreak_attempts(is_successful);
CREATE INDEX idx_global_lab_stats_date ON global_lab_stats(date);