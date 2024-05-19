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
                <td style="text-align: center;">Kategori</td>
                <td style="text-align: center;">Nama Lembaga</td>
                <td style="text-align: center;">Alamat Lembaga</td>
                <td style="text-align: center;">No.Telp Lembaga</td>
                <td style="text-align: center;">Nama Contact Person</td>
                <td style="text-align: center;">No.Telp Contact Person</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->company_category }}</td>
                <td>{{ $item->company_name }}</td>
                <td>{{ $item->company_address }}</td>
                <td>{{ $item->company_phone }}</td>
                <td>{{ $item->pic_name }}</td>
                <td>{{ $item->pic_phone }}</td>
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