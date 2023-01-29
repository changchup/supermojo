-- CreateTable
CREATE TABLE "url" (
    "id" BIGSERIAL NOT NULL,
    "url" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_url_key" ON "url"("url");

-- CreateIndex
CREATE UNIQUE INDEX "url_slug_key" ON "url"("slug");

-- CreateIndex
CREATE INDEX "url_slug_url_idx" ON "url"("slug", "url");
