export interface DefaultOptions {
  /**
   * 页面参数
   */
  query?: Record<string, unknown>
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: any) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: any) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: any) => void
}

export interface NavOptions extends DefaultOptions {
  /**
   * 窗口显示的动画类型
   */
  animationType?:
  'auto' | /* 自动选择动画效果 */
  'none' | /* 无动画效果 */
  'slide-in-right' | /* 从右侧横向滑动效果 */
  'slide-in-left' | /* 左侧横向滑动效果 */
  'slide-in-top' | /* 从上侧竖向滑动效果 */
  'slide-in-bottom' | /* 从下侧竖向滑动效果 */
  'fade-in' | /* 从透明到不透明逐渐显示效果 */
  'zoom-out' | /* 从小到大逐渐放大显示效果 */
  'zoom-fade-out' | /* 从小到大逐渐放大并且从透明到不透明逐渐显示效果 */
  'pop-in' /* 从右侧平移入栈动画效果 */
  /**
   * 窗口显示动画的持续时间，单位为 ms
   */
  animationDuration?: number
}

export interface BackOptions extends Omit<DefaultOptions, 'query'> {
  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
   */
  delta?: number
  /**
   * 窗口关闭的动画类型
   */
  animationType?:
  'auto' | /* 自动选择动画效果 */
  'none' | /* 无动画效果 */
  'slide-out-right' | /* 横向向右侧滑出屏幕动画 */
  'slide-out-left' | /* 横向向左侧滑出屏幕动画 */
  'slide-out-top' | /* 竖向向上侧滑出屏幕动画 */
  'slide-out-bottom' | /* 竖向向下侧滑出屏幕动画 */
  'fade-out' | /* 从不透明到透明逐渐隐藏动画 */
  'zoom-in' | /* 从大逐渐缩小关闭动画 */
  'zoom-fade-in' | /* 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画 */
  'pop-out' /* 从右侧平移出栈动画效果 */
  /**
   * 窗口关闭动画的持续时间，单位为 ms
   */
  animationDuration?: number
}
