<?php
/* Smarty version 3.1.32, created on 2019-05-23 17:12:10
  from 'C:\OpenServer\domains\react.native\protected\themes\base\smarty\components\meta.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5ce6aa3acaaaa3_34732835',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '59d6048a034a9612cd1ec3e1fe5eab01eeda486e' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react.native\\protected\\themes\\base\\smarty\\components\\meta.tpl',
      1 => 1544708535,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ce6aa3acaaaa3_34732835 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html class="no-js" itemscope="itemscope" itemtype="http://schema.org/<?php if (!isset($_smarty_tpl->tpl_vars['uri']->value[1])) {?>WebPage<?php } else { ?>ItemPage<?php }?>" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><head><title itemprop="name"><?php echo $_smarty_tpl->tpl_vars['_meta']->value['title'];?>
</title><meta charset="utf-8"><meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><meta content="<?php echo $_smarty_tpl->tpl_vars['_meta']->value['robots'];?>
" name="robots"><meta content="<?php echo $_smarty_tpl->tpl_vars['_meta']->value['keywords'];?>
" name="keywords"><meta content="<?php echo $_smarty_tpl->tpl_vars['_meta']->value['description'];?>
" name="description" itemprop="description"><?php if (isset($_smarty_tpl->tpl_vars['pagination']->value['prev']) && $_smarty_tpl->tpl_vars['pagination']->value['prev'] !== '') {?><link rel="prev" href="?page=<?php echo $_smarty_tpl->tpl_vars['pagination']->value['prev'];?>
"><?php }
if (isset($_smarty_tpl->tpl_vars['pagination']->value['next']) && $_smarty_tpl->tpl_vars['pagination']->value['next'] !== '') {?><link rel="next" href="?page=<?php echo $_smarty_tpl->tpl_vars['pagination']->value['next'];?>
"><?php }?><link rel="home" href="/"><!-- CSS --><link type="text/css" rel="stylesheet" href="/css/normalize.css" ><link type="text/css" rel="stylesheet" href="/css/style.css" ></head><body class="page-<?php echo $_smarty_tpl->tpl_vars['_page']->value['system'];?>
"><?php }
}
