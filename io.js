/**
 * Created by bogdan on 08.10.17.
 */
// Saves options to chrome.storage
function construct_func(user_input){
  return function foo(){
      eval(user_input);
  };
}

function get_source() {
  let lis_coll = document.getElementById("scripts").getElementsByTagName("li");
  let lis = Array.prototype.slice.call(lis_coll);
  console.log('\n');
  console.log('\n');
  console.log('\n');
  let merged = {}; // will produce mapping like command_name: command_source
  lis.forEach(li_tag => {
    let [field_name, field_area] = Array.from(li_tag.children).map(
        function(x){return x.value}
    );
      merged[field_name] = construct_func(field_area);
      console.log(field_name + '  ' + field_area);
  });
  return merged

}


function save_options() {
    let sources = get_source();
    chrome.storage.sync.set(
        sources, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
}
function save_options() {
    
}

function run_command() {
  // take command from textarea and execute it
  construct_func(get_source())();

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get('saved_func', function(user_function) {
    console.log('foo bar baz');
    console.log(user_function.constructor.name);
    console.log('get blalalalal');
    document.getElementById('func').textContent = user_function.constructor.name;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('run').addEventListener('click', run_command);