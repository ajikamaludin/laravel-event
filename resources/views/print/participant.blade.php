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
                <td style="text-align: center;">Nama</td>
                <td style="text-align: center;">No.Telp</td>
                <td style="text-align: center;">Alamat</td>
                <td style="text-align: center;">Email</td>
                <td style="text-align: center;">Jenis Kelamin</td>
                <td style="text-align: center;">Kota</td>
                <td style="text-align: center;">Tanggal Lahir</td>
                <td style="text-align: center;">Nama Lembaga</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->name }}</td>
                <td>{{ $item->phone }}</td>
                <td>{{ $item->address }}</td>
                <td>{{ $item->email }}</td>
                <td>{{ $item->gender }}</td>
                <td>{{ $item->city }}</td>
                <td>{{ $item->dob }}</td>
                <td>{{ $item->client->company_name }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
<script>
    window.print()
    // window.onfocus = function() {
    //     window.close();
    // }
</script>

</html>