library(dplyr)
library(jsonlite)

json_data <- fromJSON('dataFiles/dummyData.json')
json_data <- as.data.frame(json_data)
data <- substr(json_data$Tijd, 1, 2)
test <- as.data.frame(test)
t <- sapply(json_data$Tijd,  function(x){
  if(grepl("/",substr(x, 1, 2))){
    x <- paste0("0",x)
    
    return(x)
  }
  return(x)
}) 

t <- sapply(t,  function(x){
  if(grepl(":",substr(x, 14, 14)) == FALSE){
    x <- paste(substr(x,0, 11), "0", substr(x, 12, 16), sep = "")
    #print(x)
    return(x)
  }
  return(x)
})


json_data$Tijd <- t

exportJson <- toJSON(json_data, pretty=TRUE)
write(exportJson, "dataFiles/dateParsed.json")

