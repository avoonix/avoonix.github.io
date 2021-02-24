import fs from "fs";
import path from "path";
import YAML from "yaml";

const getMeta = () => {
  const fileContents = YAML.parse(
    fs.readFileSync(path.join(process.cwd(), "meta.yaml"), "utf8")
  );
  for (const image of Object.values(fileContents.gallery)) {
    image.metaTitle = image.meta[process.env.NEXT_PUBLIC_I18N_LOCALE].title;
    image.metaDescription =
      image.meta[process.env.NEXT_PUBLIC_I18N_LOCALE].description;
    delete image.meta;
  }
  return fileContents;
};

export function getGalleryData() {
  return Object.entries(getMeta().gallery).map(([path, info]) => ({
    ...info,
    path: `/images/${path}`,
  }));
}

export function getAllImageIds() {
  return getGalleryData().map((info) => ({
    params: { id: info.id },
  }));
}

export function getImageData(id) {
  return getGalleryData().find((g) => g.id === id);
}

export function getArtistData(name) {
  const data = getMeta().artists[name];
  if (!data) {
    throw new Error(`unknown artist ${name}`);
  }
  return { ...data, name };
}