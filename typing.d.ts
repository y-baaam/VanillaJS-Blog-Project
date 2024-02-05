declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.md" {
  const content: string;
  export default content;
}
