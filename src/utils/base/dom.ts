/**
 * 要素を適した大きさにリサイズ
 * @param element 要素
 * @param height 指定の高さ
 */
export const resize = (element: HTMLElement, height?: number): number => {
  element.style.height = `0`;
  element.style.height = `${height ?? element.scrollHeight}px`;
  return height ?? element.scrollHeight;
};
