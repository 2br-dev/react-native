<?php
/* Smarty version 3.1.32, created on 2019-05-30 20:52:22
  from 'C:\OpenServer\domains\react-native.local\protected\themes\base\smarty\components\scripts.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5cf01856e45e96_99001493',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '553cc5f892eded2255a42bfccb9a67f16dd4ce32' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react-native.local\\protected\\themes\\base\\smarty\\components\\scripts.tpl',
      1 => 1559238739,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5cf01856e45e96_99001493 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\OpenServer\\domains\\react-native.local\\protected\\app\\libs\\smarty.plugins\\function.compress.php','function'=>'smarty_function_compress',),));
echo smarty_function_compress(array('attr'=>'data-no-instant','mode'=>'js','source'=>array(array('file'=>'/js/vendor.min.js'),array('file'=>'/js/app.min.js'))),$_smarty_tpl);
echo '<script'; ?>
 src="/front-end/build/static/js/2.f74347ac.chunk.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 src="/front-end/build/static/js/main.d39193e3.chunk.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 src="/front-end/build/static/js/runtime~main.a8a9905a.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript" src="/js/jquery.min.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript" src="/js/main.js"><?php echo '</script'; ?>
></body></html><?php }
}
