import { FileValidator } from './../models/file-validator.model';
const acceptedFormat = ['jpg', 'jpeg', 'png'];

export const fileValidator = (files: FileList): FileValidator => {
  if (!files || !files.length)
    return {
      message: 'Please select image file',
      success: false,
    };
  const file = files[0];
  const format = file.type.split('/')[1] || null;

  if (!format || !acceptedFormat.includes(format))
    return {
      message: 'File should be of image type',
      success: false,
    };

  return {
    success: true,
    file,
  };
};
