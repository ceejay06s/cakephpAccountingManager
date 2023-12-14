<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <?php foreach ($vitefiles['css'] as $viteFile) : ?>
        <link rel="text/stylesheet" href="<?= DS . 'dist' . DS . $viteFile ?>" />
    <?php endforeach ?>
</head>

<body>
    <?= $content_for_layout; ?>
</body>
<?php foreach ($vitefiles['js'] as $viteFile) :  ?>

    <script type="module" src="<?= DS . 'dist' . DS . $viteFile ?>"></script>
<?php endforeach ?>

</html>