<?php
/* Smarty version 3.1.32, created on 2019-05-23 17:15:08
  from 'C:\OpenServer\domains\react.native\protected\app\core\admin-template\view\settings\menu\index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5ce6aaecd57e49_31170790',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '489e445719d38aa9d813e38919dcc4099f01e9f0' => 
    array (
      0 => 'C:\\OpenServer\\domains\\react.native\\protected\\app\\core\\admin-template\\view\\settings\\menu\\index.tpl',
      1 => 1512138870,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ce6aaecd57e49_31170790 (Smarty_Internal_Template $_smarty_tpl) {
?><table class="table"><col><col width="160"><col width="160"><col width="65"><thead><tr><th colspan="4">Список меню</th></tr></thead><tbody><tr><td class="h">Наименование меню</td><td class="h">Системное имя</td><td class="h">Отображать подменю</td><td class="h tac"></td></tr><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['menu_list']->value, 'item', false, NULL, 'i', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?><tr><td><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/menu/edit/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" title="Редактировать" class="module-item-link"><i class="zmdi zmdi-edit"></i> <?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</a></td><td><?php echo $_smarty_tpl->tpl_vars['item']->value['system'];?>
</td><td><?php if ($_smarty_tpl->tpl_vars['item']->value['tree'] == 1) {?><span class="color-green">Да</span><?php } else { ?><span class="color-red">Нет</span><?php }?></td><td class="tac"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/menu/edit/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" class="zmdi zmdi-edit" title="Редактировать"></a><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/menu/del/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" class="zmdi zmdi-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить меню?');" data-no-instant></a></td></tr><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?></tbody></table><div class="button-container clearfix"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/menu/add" class="button"><i class="zmdi zmdi-plus-circle"></i>Добавить меню</a></div><?php }
}
