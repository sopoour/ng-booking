import theme from "@app/styles/theme";
import "styled-components";

declare module "styled-components" {
  type MyTheme = typeof theme;

  interface DefaultTheme extends MyTheme {}
}
