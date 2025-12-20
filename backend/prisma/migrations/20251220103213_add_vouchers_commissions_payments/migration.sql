-- CreateEnum
CREATE TYPE "VoucherStatus" AS ENUM ('ACTIVE', 'PAID');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "creditBalance" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ClientCommission" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "percent" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "payableAmount" DECIMAL(12,2),
    "balance" DECIMAL(12,2) NOT NULL,
    "status" "VoucherStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "voucherId" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appliedCommissionPercent" DECIMAL(5,2),
    "commissionAmount" DECIMAL(12,2),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClientCommission_clientId_idx" ON "ClientCommission"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientCommission_clientId_day_key" ON "ClientCommission"("clientId", "day");

-- CreateIndex
CREATE INDEX "Voucher_clientId_idx" ON "Voucher"("clientId");

-- CreateIndex
CREATE INDEX "Voucher_status_idx" ON "Voucher"("status");

-- CreateIndex
CREATE INDEX "Payment_voucherId_idx" ON "Payment"("voucherId");

-- AddForeignKey
ALTER TABLE "ClientCommission" ADD CONSTRAINT "ClientCommission_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
