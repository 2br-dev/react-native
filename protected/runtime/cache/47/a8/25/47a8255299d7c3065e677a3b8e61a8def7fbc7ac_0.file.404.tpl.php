<?php
/* Smarty version 3.1.32, created on 2019-06-04 19:19:25
  from 'C:\OpenServer\domains\react-native.local\protected\themes\base\smarty\core\404.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5cf69a0dedff42_08414544',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '47a8255299d7c3065e677a3b8e61a8def7fbc7ac' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react-native.local\\protected\\themes\\base\\smarty\\core\\404.tpl',
      1 => 1495750056,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:../system/sitemap.tpl' => 1,
  ),
),false)) {
function content_5cf69a0dedff42_08414544 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\OpenServer\\domains\\react-native.local\\protected\\app\\libs\\smarty.plugins\\function.compress.php','function'=>'smarty_function_compress',),));
?><!DOCTYPE html>
<!-- (c) lnk. celebro | http://www.celebro.ru/ -->
<html><head><?php echo smarty_function_compress(array('mode'=>'css','type'=>'inline','source'=>array(array('file'=>'/css/main.min.css'))),$_smarty_tpl);?>
<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="cms" content="celebro.cms"><meta name="author" content="http://celebro.ru/"><meta name="viewport" content="width=device-width; user-scalable=yes"><meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['keywords'];?>
"><meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['description'];?>
"><meta name="robots" content="noindex,nofollow"><meta http-equiv="Cache-Control" content="public"><meta http-equiv="Cache-Control" content="max-age=3600, must-revalidate"><link rel="icon" type="image/png" href="/images/favicon.png"><!--[if IE]><link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico"><![endif]--><title><?php echo $_smarty_tpl->tpl_vars['_page']->value['title'];?>
</title></head><body class="error-page"><div class="error-page__wrapper"><h1 class="error-page__title"><?php echo $_smarty_tpl->tpl_vars['_page']->value['name'];?>
</h1><form action="/search" class="error-page__search"><input name="q" placeholder="Найти на сайте" class="error-page__search__input"><button type="submit" class="error-page__search__button">Поиск</button></form><a href="/" class="error-page__goto">&larr; <span class="error-page__goto__label">На главную</span></a><ul class="error-page__sitemap"><?php $_smarty_tpl->_subTemplateRender("file:../system/sitemap.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('tree'=>$_smarty_tpl->tpl_vars['_sitemap']->value,'link'=>'/'), 0, false);
?></ul></div></body></html><?php }
}
