-- CreateTable
CREATE TABLE "personas" (
    "id" SERIAL NOT NULL,
    "tipo_identificacion" VARCHAR NOT NULL,
    "numero_identificacion" VARCHAR NOT NULL,
    "nombre1" VARCHAR NOT NULL,
    "nombre2" VARCHAR,
    "apellido1" VARCHAR NOT NULL,
    "apellido2" VARCHAR,
    "sexo" VARCHAR NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);
