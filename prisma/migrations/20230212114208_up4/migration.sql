-- AlterTable
CREATE SEQUENCE avatars_ida_seq;
ALTER TABLE "Avatars" ALTER COLUMN "idA" SET DEFAULT nextval('avatars_ida_seq');
ALTER SEQUENCE avatars_ida_seq OWNED BY "Avatars"."idA";
