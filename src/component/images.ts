import loadImage from "blueimp-load-image";

export const orientateImage = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    loadImage.parseMetaData(file, (data) => {
      const options: any = {
        canvas: true,
      };
      if ((data as any).exif) {
        options.orientation = (data as any).exif.get("Orientation");
      }
      loadImage(
        file,
        (canvas) => {
          const imageUri = (canvas as HTMLCanvasElement).toDataURL("image/jpg");
          const imageFile = toBlob(imageUri);
          resolve({
            imageFile,
            imageUri,
          });
        },
        options
      );
    });
  });
};

export const toByteArray = (file: Blob): Promise<{ byteArray: number[] }> => {
  return new Promise((resolve, reject) => {
    const file_reader = new FileReader();
    file_reader.onload = function (event) {
      if (
        event.target &&
        event.target.result &&
        typeof event.target.result !== "string"
      ) {
        resolve({ byteArray: Array.from(new Uint8Array(event.target.result)) });
      }
    };
    file_reader.readAsArrayBuffer(file);
  });
};

export const toBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const toBlob = (base64: string) => {
  try {
    const bin = atob(base64.replace(/^.*,/, ""));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) {
      buffer[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([buffer.buffer], {
      type: "image/jpg",
    });
    return blob;
  } catch (e) {
    // reject()
    return undefined;
  }
};
