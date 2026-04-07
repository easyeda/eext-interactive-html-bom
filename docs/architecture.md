# iBOM for EasyEDA Pro — 功能与实现文档

- 扩展名：ibom-pro
- 版本：2.4.1
- 平台：嘉立创 EDA 专业版 V3+

在 PCB 编辑器里直接打开交互式 BOM 查看器，不用导出中间文件。点菜单就能看到器件在板子上的位置，点 BOM 表格里的行就高亮对应器件。也可以导出成独立 HTML 文件，发给没装 EDA 的人看。

## 菜单总览

| # | 菜单项 | 注册函数 | 说明 |
|---|--------|----------|------|
| 1 | 打开交互式 BOM | `showIBOM` | 在 iframe 中打开 iBOM 查看器 |
| 2 | 导出 HTML 文件 | `exportHTML` | 采集数据后生成独立 HTML 文件下载 |
| 3 | 关于... | `about` | 显示扩展信息 |

---

## 1. 打开交互式 BOM

**做什么：** 在 PCB 编辑器里弹出一个窗口，左边是 BOM 表格，右边是 PCB 正反面视图。点表格里的行，板子上对应的器件会高亮。

**用户操作：**
1. 打开 PCB 文件
2. 顶部菜单 → iBOM → 打开交互式 BOM
3. 等几秒数据采集完成，自动渲染

**实现要点：**
- 注册函数：`showIBOM`
- 调用 `eda.sys_IFrame.openIFrame('/iframe/index.html', 1200, 800, 'ibom-viewer')`
- iframe 内 auto-init 流程：等待 eda API → `collectPcbData()` → `fixPcbData()` → `initBOM()`
- 数据采集通过 `eda.pcb_Primitive*.getAll()` 系列 API
- 焊盘通过 `component.getAllPins()` 获取，不使用 `eda.pcb_PrimitivePad.getAll()`（后者返回弧度角度且与元件焊盘重复）

## 2. 导出 HTML 文件

**做什么：** 把当前 PCB 的 iBOM 导出成一个独立 HTML 文件，不依赖 EDA，浏览器直接打开就能用。

**用户操作：**
1. 顶部菜单 → iBOM → 导出 HTML 文件
2. 弹出小窗口显示进度
3. 完成后自动弹出文件保存对话框

**实现要点：**
- 注册函数：`exportHTML`
- 通过 `eda.sys_Storage.setExtensionUserConfig('ibom_export_mode', 'true')` 设置导出标志
- 打开 iframe，iframe 检测到标志后进入导出模式
- 读取模板 HTML（`eda.sys_FileSystem.getExtensionFile('/iframe/index.html')`）
- 将 pcbdata 和 config 用 `JSON.stringify` 嵌入模板，转义 `</` 防止 script 标签截断
- 通过 `eda.sys_FileSystem.saveFile()` 下载
- 导出的 HTML 内 auto-init 检测到 `window.pcbdata` 已存在，直接调用 `initBOM()` 跳过数据采集

## 3. 关于

**做什么：** 显示扩展名称和简介。

**实现要点：**
- 注册函数：`about`
- 调用 `eda.sys_Dialog.showInformationMessage()`

---

## 附录 A：EDA API 清单

<details>
<summary>展开 API 列表</summary>

| API | 用途 | 使用者 |
|-----|------|--------|
| `eda.pcb_PrimitiveComponent.getAll()` | 获取所有元件 | #1, #2 |
| `component.getAllPins()` | 获取元件焊盘 | #1, #2 |
| `eda.pcb_PrimitiveLine.getAll()` | 获取所有直线 | #1, #2 |
| `eda.pcb_PrimitiveArc.getAll()` | 获取所有圆弧 | #1, #2 |
| `eda.pcb_PrimitivePolyline.getAll()` | 获取所有折线 | #1, #2 |
| `eda.pcb_PrimitiveVia.getAll()` | 获取所有过孔 | #1, #2 |
| `eda.pcb_PrimitivePour.getAll()` | 获取所有铺铜区域 | #1, #2 |
| `eda.pcb_PrimitivePoured.getAll()` | 获取所有铺铜填充 | #1, #2 |
| `eda.pcb_PrimitiveString.getAll()` | 获取所有文字 | #1, #2 |
| `eda.pcb_PrimitiveFill.getAll()` | 获取所有填充 | #1, #2 |
| `eda.pcb_Net.getAllNetsName()` | 获取所有网络名 | #1, #2 |
| `eda.dmt_Board.getCurrentBoardInfo()` | 获取板子名称 | #1, #2 |
| `eda.sys_IFrame.openIFrame()` | 打开 iframe 窗口 | #1, #2 |
| `eda.sys_IFrame.closeIFrame()` | 关闭 iframe 窗口 | #2 |
| `eda.sys_Storage.setExtensionUserConfig()` | 存储导出标志 | #2 |
| `eda.sys_Storage.getExtensionUserConfig()` | 读取导出标志 | #2 |
| `eda.sys_FileSystem.getExtensionFile()` | 读取扩展内文件 | #2 |
| `eda.sys_FileSystem.saveFile()` | 下载文件 | #2 |
| `eda.sys_Dialog.showInformationMessage()` | 显示信息对话框 | #3 |
| `eda.sys_FileManager.getFootprintFileByFootprintUuid()` | 获取封装库文件 | #1, #2 |

</details>

## 附录 B：技术架构

### 文件结构

- `src/index.ts` — 扩展入口，导出 `showIBOM`、`exportHTML`、`about`
- `iframe/index.html` — iBOM 查看器，自包含所有 JS/CSS（约 5000 行）
- `pro-api-sdk/iframe/index.html` — 同上，扩展包内的副本

### 数据流

```
EDA Pro API → collectPcbData() → fixPcbData() → pcbdata → initBOM() → Canvas 渲染
```

### 坐标系

EDA Pro 内部 Y-up，iBOM Y-down。采集时对 Y 取反（`neg` 函数）。`fixPcbData` 后处理检测板框与元件的 Y 轴重叠率，不足 50% 时尝试翻转或平移修正。

### 焊盘处理

- 焊盘数据通过 `component.getAllPins()` 获取（度数角度）
- 不使用 `eda.pcb_PrimitivePad.getAll()` 作为 orphan pads（该 API 返回弧度角度，且包含元件内焊盘导致重复渲染）
- 支持 ELLIPSE、RECT/RECTANGLE、REGULAR_POLYGON、POLYLINE_COMPLEX_POLYGON 四种 shapeType
- hole 数据可能只有两个元素，第二个尺寸 fallback 到第一个

### 铺铜处理

铺铜坐标单位为 mm，其他图元为 0.1mm。`pourP2s`/`pourCp2s` 函数对坐标 ×10 并取反 Y。

### 丝印处理

- 全局丝印：从 `eda.pcb_PrimitiveString/Line/Arc/Polyline/Fill.getAll()` 采集丝印层图元
- 封装丝印：通过 `eda.sys_FileManager.getFootprintFileByFootprintUuid()` 获取 `.elibz2` 封装库文件，解压后解析 `.elibu` 格式，提取丝印层（layerId=3/4）的 POLY 和 FILL 图元
- 封装丝印坐标转换：本地坐标 → 旋转（元件 rotation）→ 镜像（背面元件 X 取反）→ 平移（元件 center）→ Y 取反（Y-down）
- 相同封装 UUID 的解析结果缓存，避免重复下载
- 丝印文字过滤：自动去除封装名、hex ID、器件型号等

### 已知限制

- `eda.pcb_PrimitivePad.getAll()` 返回的 rotation 为弧度而非度数，与 `getAllPins()` 不一致
- LZString 库只包含解压功能，无法在客户端压缩数据
- `eda.sys_IFrame.openIFrame()` 不支持 URL 查询参数
- `eda.sys_FileManager.getFootprintFileByFootprintUuid()` 需要团队库下载权限，无权限时静默跳过
