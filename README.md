# Interactive Html Bom 

交互式 BOM（物料清单）查看器，适用于嘉立创 EDA 专业版（V3）。

## 功能

![alt text](images/Ibom1.png)

- PCB 编辑器内直接打开交互式 BOM 查看器
- BOM 表格与 PCB 视图联动高亮，点击行即定位器件
- 正面/背面视图切换
- 网络高亮（点击走线或焊盘查看同网络连接）
- 封装丝印轮廓渲染（从封装库文件提取，跟随元件旋转和镜像）
- 丝印文字显示（自动过滤封装名等无用信息，只保留位号和标注）
- 铺铜区域渲染
- 多种焊盘外形（矩形、圆形、椭圆、正多边形、复杂多边形）
- 异形板框（圆角矩形、圆弧边）
- 导出独立 HTML 文件，浏览器直接打开，离线可用

## 使用

1. 在嘉立创 EDA 专业版中打开 PCB 文件
2. 顶部菜单栏 → **iBOM** → **打开交互式 BOM**
3. 等几秒数据采集完成，iBOM 自动渲染

导出 HTML：菜单栏 → **iBOM** → **导出 HTML 文件**

## 来源

本项目移植自 [easyeda-ibom-extension](https://github.com/turbobabr/easyeda-ibom-extension)（[Andrey Shakhmin](https://github.com/turbobabr)），原项目适配 EasyEDA 标准版。

iBOM 核心渲染引擎来自 [InteractiveHtmlBom](https://github.com/openscopeproject/InteractiveHtmlBom)（[qu1ck](https://github.com/qu1ck)）。

