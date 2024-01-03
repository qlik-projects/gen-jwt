$match_user_subject_pattern = 'ANON_'
$user_created_hours_ago = '72'
$users = qlik user ls --raw | ConvertFrom-Json
$users_list = $users.data
do {
    $separator = "startingAfter=([^}]*)}"
    $nextURL = ($users.links.next -split $separator)[1]
    $users = ''
    $users = qlik user ls --startingAfter $nextURL --raw | ConvertFrom-Json
    $users_list += $users.data
} while (($users.links.next).Length -gt 0)
foreach($user in $users_list) {
    if ($user.subject -like "$($match_user_subject_pattern)*" -and $user.createdAt -gt (Get-Date).AddHours(-$user_created_hours_ago)) {
        Write-Host "Deleting user: $user.subject"
        $null = qlik user rm $user.id
    }
}