json.online @online do |user|
    json.id user.id
    json.name (user.name).truncate(150)
    json.email user.email
    json.description user.description
    json.photo user.photo
    json.status user.translated_status
end

json.offline @offline do |user|
    json.id user.id
    json.name (user.name).truncate(150)
    json.email user.email
    json.description user.description
    json.photo user.photo
    json.status user.translated_status
end