<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print</title>
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
                <td style="text-align: center;">ID</td>
                <td style="text-align: center;">Nama</td>
                <td style="text-align: center;">No.Telp</td>
                <td style="text-align: center;">Alamat</td>
                <td style="text-align: center;">Email</td>
                <td style="text-align: center;">Jenis Kelamin</td>
                <td style="text-align: center;">Kota</td>
                <td style="text-align: center;">Tanggal Lahir</td>
                <td style="text-align: center;">Amanah Pekerjaan</td>
                <td style="text-align: center;">Foto</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->participant->code }}</td>
                <td>{{ $item->participant->name }}</td>
                <td>{{ $item->participant->phone }}</td>
                <td>{{ $item->participant->address }}</td>
                <td>{{ $item->participant->email }}</td>
                <td>{{ $item->participant->gender }}</td>
                <td>{{ $item->participant->city }}</td>
                <td>{{ $item->participant->dob }}</td>
                <td>{{ $item->participant->job_trust }}</td>
                <td><img src='{{ $item->participant->photo_url }}' style="max-width: 100px;" /></td>
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