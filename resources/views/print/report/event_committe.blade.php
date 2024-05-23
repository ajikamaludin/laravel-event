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
                <td style="text-align: center;">Tanggal Awal</td>
                <td style="text-align: center;">Tanggal Akhir</td>
                <td style="text-align: center;">Nama Kegiatan</td>
                <td style="text-align: center;">Lembaga</td>
                <td style="text-align: center;">Panitia</td>
                <td style="text-align: center;">Tugas</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $index => $item)
            <tr>
                <td>{{ $item->event->start_date }}</td>
                <td>{{ $item->event->end_date }}</td>
                <td>{{ $item->event->name }}</td>
                <td>{{ $item->event->client->company_name }}</td>
                <td>{{ $item->committe->name }}</td>
                <td>{{ $item->task->name }}</td>
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