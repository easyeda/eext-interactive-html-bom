# Changelog

## 2.5.1

- 新增支持过孔预览功能
- 新增支持自定义导出持久化
- 自定义导出默认PCB界面时允许配置默认展示板层
- 优化UI交互细节

## 2.5.0

- 新增自定义导出功能，可配置导出的默认值
- 新增PCB独立预览功能，可预览多层板线路
- 新增悬浮工具栏功能，可折叠顶部工具栏
- 新增适配移动端UI，便于窄屏手机端预览
- 新增可定义表头，允许折叠不常用的表头
- 为wiki.lceda.cn的烧录工具展示PCB图层优化

## 2.4.4

- 修复了封装内矩形因为R命令不匹配导致显示异常的问题
- 修复了器件标识框因为pin在local坐标系中角度而显示错误的问题


## 2.4.3

### 优化
- 优化多语言

## 2.4.2

### 新增
- 汉化支持

## 2.4.1

### 封装丝印

- 从封装库文件（.elibz2）中提取丝印轮廓线，渲染到 iBOM 视图
- 通过 `eda.sys_FileManager.getFootprintFileByFootprintUuid()` 获取封装文件，解压 zip 后解析 .elibu 格式
- 封装本地坐标根据元件的位置、旋转角度、正反面自动转换为 PCB 全局坐标
- 相同封装 UUID 的解析结果会缓存，避免重复下载
- 修复 ARC 命令处理中前一个点坐标丢失导致近似整圆渲染异常的问题

### 界面调整

- 移除 iBOM 查看器内的"导出 HTML 文件"按钮，导出功能保留在菜单栏入口

## 1.1.0

### 焊盘渲染修复

- 修复矩形焊盘无法识别的问题：EDA Pro 返回的 shapeType 为 `RECT` 而非文档中的 `RECTANGLE`
- 修复通孔焊盘渲染为花瓣形的问题：移除了 orphan pads 的重复渲染
- 修复焊盘孔数据解析：hole 数组缺少第二个尺寸时 fallback 到第一个
- 修复 drillshape 判断：根据 hole 类型正确设置，不再硬编码为 oblong
- 修复 drawPadHole 对 null drillsize 的防御

### 导出 HTML 修复

- 修复导出文件被截断的问题：转义 `</` 防止 script 标签被提前关闭
- 修复 LZString 库缺少压缩方法导致客户端导出失败
- 补充 config 中缺失的 `show_crosshair` 字段

## 1.0.0

首个适配嘉立创 EDA 专业版（V3+）的版本。

### PCB 渲染

- 板框渲染（矩形 R 命令、圆弧边、异形板框），支持 rotation 参数
- 板框与元件坐标自动对齐（Y 轴重叠检测、翻转、平移修正）
- 走线和独立弧线渲染
- 铺铜区域渲染（mm 与 0.1mm 单位换算）
- 过孔渲染

### 焊盘

- 四种焊盘外形：ELLIPSE、RECTANGLE、REGULAR_POLYGON、POLYLINE_COMPLEX_POLYGON

### 丝印

- 丝印文字渲染，自动过滤封装名、hex ID、尺寸描述、器件型号
- 保留 Designator 和独立丝印标注

### BOM

- BOM 表格与 PCB 视图联动高亮
- 分组/展开/网络三种模式
- 导出独立 HTML 文件

### 坐标系

- EDA Pro Y-up → iBOM Y-down 坐标转换
- `fixPcbData` 后处理自动检测板框与元件的 Y 轴对齐
