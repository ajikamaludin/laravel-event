<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panitia</title>
    <style>
        table {
            border-collapse: collapse;
        }
    </style>
</head>

<body>
    <table style="width: 100%;" border=1>
        <thead>
            <tr>
                <td style="text-align: center;">Tanggal</td>
                <td style="text-align: center;">Panitia</td>
                <td style="text-align: center;">Jenis</td>
                <td style="text-align: center;">Jumlah</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->rdate }}</td>
                <td>{{ $item->committee->name }}</td>
                <td>{{ $item->logistic->name }}</td>
                <td>{{ $item->qty }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
<script>
    window.print()
    window.onfocus = function() {
        window.close();
    }
</script>

</html>