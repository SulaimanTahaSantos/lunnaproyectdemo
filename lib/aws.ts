import AWS from "aws-sdk";

// Configurar AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "lunna-avatars";

export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    // Validar configuración
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_REGION
    ) {
      throw new Error("Credenciales AWS no configuradas");
    }

    if (!BUCKET_NAME) {
      throw new Error("AWS_S3_BUCKET_NAME no configurado");
    }

    console.log("Configuración S3:", {
      bucket: BUCKET_NAME,
      region: process.env.AWS_REGION,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    });

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: `avatars/${Date.now()}-${fileName}`,
      Body: file,
      ContentType: contentType,
      ACL: "public-read", // Para que sea accesible públicamente
    };

    console.log("Upload params:", {
      bucket: uploadParams.Bucket,
      key: uploadParams.Key,
      contentType: uploadParams.ContentType,
    });

    const result = await s3.upload(uploadParams).promise();
    console.log("Upload successful:", result.Location);
    return result.Location;
  } catch (error: any) {
    console.error("Error detallado uploading to S3:", error);
    throw new Error(`Error al subir archivo a S3: ${error.message || error}`);
  }
}

export async function deleteFromS3(fileUrl: string): Promise<void> {
  try {
    // Extraer la key del URL
    const urlParts = fileUrl.split("/");
    const key = urlParts.slice(3).join("/"); // Remover https://bucket.s3.region.amazonaws.com/

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw new Error("Error al eliminar archivo de S3");
  }
}

// Generar URL presignada para upload directo desde el cliente
export function generatePresignedUrl(
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `avatars/${Date.now()}-${fileName}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
    Expires: 300, // 5 minutos
  };

  return s3.getSignedUrlPromise("putObject", params);
}
