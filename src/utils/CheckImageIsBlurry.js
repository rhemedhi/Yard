
function CheckImageIsBlurry(file, threshold = 15) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result; // set the image source from file

      img.onload = () => {
        // now we can safely use drawImage
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // do Laplacian variance blur detection
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let grayscale = [];
        for (let i = 0; i < pixels.length; i += 4) {
          const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          grayscale.push(avg);
        }

        const laplacianKernel = [
          [0, -1, 0],
          [-1, 4, -1],
          [0, -1, 0],
        ];

        let varianceSum = 0;
        let count = 0;
        const width = canvas.width;

        for (let y = 1; y < canvas.height - 1; y++) {
          for (let x = 1; x < canvas.width - 1; x++) {
            let laplacianValue = 0;
            for (let ky = -1; ky <= 1; ky++) {
              for (let kx = -1; kx <= 1; kx++) {
                const pixelValue = grayscale[(y + ky) * width + (x + kx)];
                laplacianValue +=
                  pixelValue * laplacianKernel[ky + 1][kx + 1];
              }
            }
            varianceSum += laplacianValue * laplacianValue;
            count++;
          }
        }

        const variance = varianceSum / count;
        const isBlurry = variance < threshold;

        resolve(isBlurry);
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file); // convert file to base64
  });
}

export default CheckImageIsBlurry;
