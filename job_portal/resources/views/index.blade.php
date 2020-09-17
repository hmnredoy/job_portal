<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Job Portal') }}</title>

    <!-- Styles -->
{{--    <link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}
</head>
<body>
<div id="app">

    @auth
        @php $user = auth()->user()
                ->only(['firstName',
                        'lastName',
                        'email',
                        'image',
                        'cv',
                        'type',
                        'skills',
                        'businessName']);
         @endphp
        <script>
            window.user = @json($user)
        </script>
    @endauth

    <script src="{{ asset('js/app.js') }}"></script>
</div>
</body>
</html>
