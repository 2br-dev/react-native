<?php
/* Smarty version 3.1.32, created on 2019-05-23 17:12:10
  from 'C:\OpenServer\domains\react.native\protected\themes\base\smarty\components\scripts.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5ce6aa3acd6c44_73050584',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8ab1dc0eeb72b828ca65b7497f899aca3a07e6d9' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react.native\\protected\\themes\\base\\smarty\\components\\scripts.tpl',
      1 => 1544706075,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ce6aa3acd6c44_73050584 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\OpenServer\\domains\\react.native\\protected\\app\\libs\\smarty.plugins\\function.compress.php','function'=>'smarty_function_compress',),));
echo smarty_function_compress(array('attr'=>'data-no-instant','mode'=>'js','source'=>array(array('file'=>'/js/vendor.min.js'),array('file'=>'/js/app.min.js'))),$_smarty_tpl);
echo '<script'; ?>
 type="text/javascript" src="/js/jquery.min.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript" src="/js/main.js"><?php echo '</script'; ?>
></body></html><?php }
}
