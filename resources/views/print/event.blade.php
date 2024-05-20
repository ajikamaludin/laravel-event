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
                <td style="text-align: center;">Tanggal Awal</td>
                <td style="text-align: center;">Nama</td>
                <td style="text-align: center;">Lembaga</td>
                <td style="text-align: center;">Lokasi</td>
                <td style="text-align: center;">Status</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->start_date }}</td>
                <td>{{ $item->name }}</td>
                <td>{{ $item->client->company_name }}</td>
                <td>{{ $item->place }}</td>
                <td>{{ $item->report->status_text }}</td>
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