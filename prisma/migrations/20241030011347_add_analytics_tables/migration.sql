-- CreateTable
CREATE TABLE "prompt_analytics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "lab_id" UUID NOT NULL,
    "prompt_text" TEXT NOT NULL,
    "tokens_used" INTEGER NOT NULL,
    "completion_tokens" INTEGER NOT NULL,
    "prompt_tokens" INTEGER NOT NULL,
    "model_used" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_time_ms" INTEGER,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error_message" TEXT,
    "metadata" JSONB,

    CONSTRAINT "prompt_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_session_analytics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "session_start" TIMESTAMPTZ NOT NULL,
    "session_end" TIMESTAMPTZ,
    "total_prompts" INTEGER NOT NULL DEFAULT 0,
    "total_tokens_used" INTEGER NOT NULL DEFAULT 0,
    "lab_interactions" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_session_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_usage_analytics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lab_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "total_users" INTEGER NOT NULL DEFAULT 0,
    "total_prompts" INTEGER NOT NULL DEFAULT 0,
    "total_tokens_used" INTEGER NOT NULL DEFAULT 0,
    "average_response_time_ms" INTEGER,
    "success_rate" DECIMAL(5,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lab_usage_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_performance_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lab_id" UUID NOT NULL,
    "difficulty" VARCHAR(20) NOT NULL,
    "gpu_required" BOOLEAN NOT NULL DEFAULT false,
    "time_estimate" VARCHAR(50) NOT NULL,
    "points_reward" INTEGER NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "active_participants" INTEGER NOT NULL DEFAULT 0,
    "success_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "lab_performance_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "lab_id" UUID NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "successful_breaks" INTEGER NOT NULL DEFAULT 0,
    "time_spent_seconds" INTEGER NOT NULL DEFAULT 0,
    "last_attempt" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_progress_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jailbreak_attempts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "lab_id" UUID NOT NULL,
    "prompt_text" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "is_successful" BOOLEAN NOT NULL DEFAULT false,
    "technique_used" VARCHAR(100),
    "points_earned" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jailbreak_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_lab_stats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "total_participants" INTEGER NOT NULL DEFAULT 0,
    "active_gpus" INTEGER NOT NULL DEFAULT 0,
    "total_points_mined" INTEGER NOT NULL DEFAULT 0,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "global_lab_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prompt_analytics_user_id_idx" ON "prompt_analytics"("user_id");

-- CreateIndex
CREATE INDEX "prompt_analytics_lab_id_idx" ON "prompt_analytics"("lab_id");

-- CreateIndex
CREATE INDEX "prompt_analytics_created_at_idx" ON "prompt_analytics"("created_at");

-- CreateIndex
CREATE INDEX "lab_usage_analytics_date_idx" ON "lab_usage_analytics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "lab_usage_analytics_lab_id_date_key" ON "lab_usage_analytics"("lab_id", "date");

-- CreateIndex
CREATE INDEX "lab_performance_metrics_lab_id_idx" ON "lab_performance_metrics"("lab_id");

-- CreateIndex
CREATE INDEX "lab_performance_metrics_category_idx" ON "lab_performance_metrics"("category");

-- CreateIndex
CREATE INDEX "user_progress_metrics_user_id_idx" ON "user_progress_metrics"("user_id");

-- CreateIndex
CREATE INDEX "user_progress_metrics_lab_id_idx" ON "user_progress_metrics"("lab_id");

-- CreateIndex
CREATE INDEX "jailbreak_attempts_user_id_idx" ON "jailbreak_attempts"("user_id");

-- CreateIndex
CREATE INDEX "jailbreak_attempts_lab_id_idx" ON "jailbreak_attempts"("lab_id");

-- CreateIndex
CREATE INDEX "jailbreak_attempts_is_successful_idx" ON "jailbreak_attempts"("is_successful");

-- CreateIndex
CREATE INDEX "global_lab_stats_date_idx" ON "global_lab_stats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "global_lab_stats_date_key" ON "global_lab_stats"("date");
