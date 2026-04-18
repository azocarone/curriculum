import { downloadAction } from './download.action';
import { themeAction } from './theme.action';
import { langAction } from './lang.action';
import { navAction } from './nav.action';

export const navActions = {
    download: downloadAction,
    theme: themeAction,
    lang: langAction,
    nav: navAction
};