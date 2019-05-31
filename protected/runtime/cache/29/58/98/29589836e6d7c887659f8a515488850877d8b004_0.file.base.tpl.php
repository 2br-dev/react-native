<?php
/* Smarty version 3.1.32, created on 2019-05-31 19:37:58
  from 'C:\OpenServer\domains\react-native.local\protected\themes\base\smarty\base.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5cf15866c3d3b7_59747495',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '29589836e6d7c887659f8a515488850877d8b004' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react-native.local\\protected\\themes\\base\\smarty\\base.tpl',
      1 => 1558942090,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./components/meta.tpl' => 1,
    'file:./components/scripts.tpl' => 1,
  ),
),false)) {
function content_5cf15866c3d3b7_59747495 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:./components/meta.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
echo $_smarty_tpl->tpl_vars['_page']->value['content'];?>
<div id="root"></div><?php $_smarty_tpl->_subTemplateRender("file:./components/scripts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
