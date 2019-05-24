<?php
/* Smarty version 3.1.32, created on 2019-05-23 17:12:10
  from 'C:\OpenServer\domains\react.native\protected\themes\base\smarty\base.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5ce6aa3ac6f2a4_93045621',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '58681becc0b9272eb310758869f0976cde6dbe46' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react.native\\protected\\themes\\base\\smarty\\base.tpl',
      1 => 1544709443,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./components/meta.tpl' => 1,
    'file:./components/scripts.tpl' => 1,
  ),
),false)) {
function content_5ce6aa3ac6f2a4_93045621 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:./components/meta.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
echo $_smarty_tpl->tpl_vars['_page']->value['content'];?>
<div class="hello-god"><h1 style="text-align: center">Hello Coder!</h1></div><?php $_smarty_tpl->_subTemplateRender("file:./components/scripts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
