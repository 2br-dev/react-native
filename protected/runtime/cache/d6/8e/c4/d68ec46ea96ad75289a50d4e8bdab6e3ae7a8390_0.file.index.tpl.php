<?php
/* Smarty version 3.1.32, created on 2019-05-23 17:15:04
  from 'C:\OpenServer\domains\react.native\protected\app\core\admin-template\view\settings\modules\index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5ce6aae8b0e7f3_93500459',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd68ec46ea96ad75289a50d4e8bdab6e3ae7a8390' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react.native\\protected\\app\\core\\admin-template\\view\\settings\\modules\\index.tpl',
      1 => 1511963598,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ce6aae8b0e7f3_93500459 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\OpenServer\\domains\\react.native\\protected\\app\\libs\\smarty.plugins\\modifier.capi.php','function'=>'smarty_modifier_capi',),));
if ($_smarty_tpl->tpl_vars['structure']->value) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['structure']->value['main'], 'stc');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['stc']->value) {
?><table class="t1 table table-toggle-trigger" id="xdata-<?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];?>
"><colgroup><col><col width="200"><col width="80"><col width="35"><col width="60"></colgroup><thead><tr class="th"><th colspan="5"><a href="#" class="table_hdr table_d js-table-toggle" data-toggle="xdata-<?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];?>
"><i class="icon"></i><?php if ($_smarty_tpl->tpl_vars['locale']->value[$_smarty_tpl->tpl_vars['stc']->value['name']]) {
echo smarty_modifier_capi($_smarty_tpl->tpl_vars['locale']->value[$_smarty_tpl->tpl_vars['stc']->value['name']]);
} else {
echo $_smarty_tpl->tpl_vars['stc']->value['name'];
}?></a></th></tr></thead><tbody><tr style="display: none;"><td class="h">Родитель</td><td class="h"><?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];
echo $_smarty_tpl->tpl_vars['stc']->value['groups'];?>
</td><td class="h"><?php echo $_smarty_tpl->tpl_vars['stc']->value['ord'];?>
</td><td class="h tac"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/visible/<?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];?>
" class="zmdi zmdi-eye<?php if ($_smarty_tpl->tpl_vars['stc']->value['visible'] == 0) {?>-off<?php }?> visible-link" onclick="return cp.toggleModule(this, event);" data-no-instant></a></td><td class="h tac"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/edit/<?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];?>
" class="zmdi zmdi-edit" title="Редактировать"></a><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/del/<?php echo $_smarty_tpl->tpl_vars['stc']->value['id'];?>
" class="zmdi zmdi-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a></td></tr><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['structure']->value['bind'][$_smarty_tpl->tpl_vars['stc']->value['id']], 'bind');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['bind']->value) {
?><tr style="display: none;"><td><?php if ($_smarty_tpl->tpl_vars['locale']->value[$_smarty_tpl->tpl_vars['bind']->value['name']]) {
echo smarty_modifier_capi($_smarty_tpl->tpl_vars['locale']->value[$_smarty_tpl->tpl_vars['bind']->value['name']]);
} else {
echo $_smarty_tpl->tpl_vars['bind']->value['name'];
}?></td><td><?php echo $_smarty_tpl->tpl_vars['bind']->value['pid'];
echo $_smarty_tpl->tpl_vars['bind']->value['groups'];?>
</td><td><?php echo $_smarty_tpl->tpl_vars['bind']->value['ord'];?>
</td><td class="tac"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/visible/<?php echo $_smarty_tpl->tpl_vars['bind']->value['id'];?>
" class="zmdi zmdi-eye<?php if ($_smarty_tpl->tpl_vars['bind']->value['visible'] == 0) {?>-off<?php }?> visible-link" onclick="return cp.toggleModule(this, event);" data-no-instant></a></td><td class="tac"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/edit/<?php echo $_smarty_tpl->tpl_vars['bind']->value['id'];?>
" class="zmdi zmdi-edit" title="Редактировать"></a><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/modules/del/<?php echo $_smarty_tpl->tpl_vars['bind']->value['id'];?>
" class="zmdi zmdi-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a></td></tr><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?></tbody></table><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
}
}
}
