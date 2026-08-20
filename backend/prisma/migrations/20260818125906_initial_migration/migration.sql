-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('DIRECT', 'SOCIAL', 'SEARCH', 'EMAIL', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(255),
    "short_code" VARCHAR(20) NOT NULL,
    "original_url" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6),
    "is_pin" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "visited_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(45),
    "country" VARCHAR(2),
    "city" VARCHAR(100),
    "device" TEXT,
    "browser" TEXT,
    "source_type" "SourceType" NOT NULL DEFAULT 'OTHER',
    "link_id" INTEGER NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "links_short_code_key" ON "links"("short_code");

-- CreateIndex
CREATE INDEX "links_short_code_idx" ON "links"("short_code");

-- CreateIndex
CREATE INDEX "links_author_id_idx" ON "links"("author_id");

-- CreateIndex
CREATE INDEX "links_expires_at_idx" ON "links"("expires_at");

-- CreateIndex
CREATE INDEX "links_deleted_at_idx" ON "links"("deleted_at");

-- CreateIndex
CREATE INDEX "visits_link_id_idx" ON "visits"("link_id");

-- CreateIndex
CREATE INDEX "visits_visited_at_idx" ON "visits"("visited_at");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
