/**
 * iBOM for EasyEDA Pro — 扩展入口
 */

const IFRAME_ID = 'ibom-viewer';
const IFRAME_WIDTH = 1200;
const IFRAME_HEIGHT = 800;

// eslint-disable-next-line unused-imports/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {}

/**
 * 打开 iBOM 查看器
 */
export function showIBOM(): void {
	eda.sys_IFrame.openIFrame('/iframe/index.html', IFRAME_WIDTH, IFRAME_HEIGHT, IFRAME_ID, {
		maximizeButton: true,
		minimizeButton: true,
		title: 'Interactive BOM',
	});
}

/**
 * 快速导出 HTML（使用默认配置）
 */
export async function exportHTML(): Promise<void> {
	await eda.sys_Storage.setExtensionUserConfig('ibom_export_mode', 'quick');
	eda.sys_IFrame.openIFrame('/iframe/index.html', 400, 200, 'ibom-export', {
		maximizeButton: false,
		minimizeButton: false,
		title: eda.sys_I18n.text('Exporting iBOM...'),
	});
}

/**
 * 高级导出 HTML（可配置导出选项）
 */
export async function exportAdvancedHTML(): Promise<void> {
	await eda.sys_Storage.setExtensionUserConfig('ibom_export_mode', 'advanced');
	eda.sys_IFrame.openIFrame('/iframe/index.html', 550, 470, 'ibom-export-advanced', {
		maximizeButton: false,
		minimizeButton: true,
		title: eda.sys_I18n.text('Export Configuration'),
	});
}

/**
 * 关于
 */
export function about(): void {
	eda.sys_Dialog.showInformationMessage(
		'iBOM for EasyEDA Pro\n交互式物料清单查看器',
		'关于 iBOM',
	);
}
