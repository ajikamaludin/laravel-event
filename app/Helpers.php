<?php

if (!function_exists('format_idr')) {
    function format_idr($number)
    {
        return number_format($number, 2, ',', '.');
    }
}
