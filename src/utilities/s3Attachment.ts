import join from "join-path";

const previewAttachment = (fileName: string) => {
  return join(import.meta.env.VITE_S3_URL, fileName);
};
export default previewAttachment;
