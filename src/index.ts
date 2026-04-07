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
 * 导出独立 HTML 文件
 */
export async function exportHTML(): Promise<void> {
	// Set export flag, iframe will check it on init
	await eda.sys_Storage.setExtensionUserConfig('ibom_export_mode', 'true');
	eda.sys_IFrame.openIFrame('/iframe/index.html', 400, 200, 'ibom-export', {
		maximizeButton: false,
		minimizeButton: false,
		title: '正在导出 iBOM...',
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
