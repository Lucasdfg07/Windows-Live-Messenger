json.online @online do |user|
    json.id user.id
    json.name user.name
    json.description user.description
    json.photo user.photo
    json.status user.translated_status
end

json.offline @offline do |user|
    json.id user.id
    json.name user.name
    json.description user.description
    json.photo user.photo
    json.status user.translated_status
end