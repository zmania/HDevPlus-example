<?php
$viewID = "ADD_POST";

?>
<? include("../../_common/include/header.php"); ?>
<? include("../../_common/elements/gnb.php"); ?>
    <div class="container">
        <form id="frm_save_post">
            <input type="hidden" name="bbs_seq" value="1"/>
            <input type="hidden" name="return_url" value="/example/post/php/list.php"/>
            <div class="mb-3">
                <label for="subject" class="form-label">Post subject</label>
                <input type="text" class="form-control" id="subject" name="subject" placeholder="Input Subject">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Post body</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="content"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">저장</button>
        </form>
    </div>
</main>
<?
//print "<pre>";
//print_r($output['controller_info']);
//print "</pre>";
?>
<?php if(is_array($output['controller_info']['js'])){ ?>
	<?php foreach($output['controller_info']['js'][0] as $strJS){ ?>
    <script type="text/javascript" src="<?=$strJS;?>?<?=time();?>"></script>
<?php } ?>
<?php }elseif(trim($output['controller_info']['js'])){ ?>
    <script type="text/javascript" src="<?=$output['controller_info']['js'];?>?<?=time();?>"></script>
<?php } ?>
</body>
</html>